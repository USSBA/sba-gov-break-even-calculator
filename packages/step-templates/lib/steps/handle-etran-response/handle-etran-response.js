const _ = require('lodash');
const StepBase = require('@aws-ee/services/lib/workflow/helpers/step-base');

class HandleEtranResponse extends StepBase {
  async start() {
    const [
      response,
      error,
      retryCount,
      etranCallLambdaFinished,
      rawData,
      requestContext,
      transactionId,
      etranTransactionService,
    ] = await Promise.all([
      this.payload.optionalObject('etranResponse'),
      this.payload.number('retryCount'),
      this.payload.optionalObject('error', null),
      this.payload.optionalString('etranCallLambdaFinished', undefined),
      this.payload.object('rawData'),
      this.payload.object('requestContext'),
      this.payload.string('transactionId'),
      this.mustFindServices('etranTransactionService'),
    ]);
    this.print(`${transactionId}: handling etran response`);

    // did the calling lambda timeout?
    if (_.isNil(etranCallLambdaFinished) && retryCount < 4) {
      await this.handleWorkflowRetry(transactionId, rawData, requestContext, retryCount);
    } else {
      const status = { transactionId, status: 'COMPLETE', response };
      if (error) {
        status.error = error;
      }
      await etranTransactionService.update(requestContext, status);
      this.print(`${transactionId}: processing complete`);
    }
  }

  async handleWorkflowRetry(transactionId, rawData, requestContext, retryCount) {
    this.print(`${transactionId}: Call to Etran timed out, trigger workflow, retryCount will be ${retryCount + 1}`);
    const meta = {
      workflowId: 'wf-etran',
    };
    const input = {
      transactionId,
      rawData,
      requestContext,
      retryCount: retryCount + 1,
    };
    const [etranTransactionService, workflowTriggerService] = await Promise.all([
      this.mustFindServices('etranTransactionService'),
      this.mustFindServices('workflowTriggerService'),
    ]);

    try {
      await workflowTriggerService.triggerWorkflow(requestContext, meta, input);
    } catch (error) {
      await etranTransactionService.update(requestContext, { transactionId, status: 'COMPLETE', error });
      throw this.boom.internalError(`${transactionId}: Unable to initiate the retry #${retryCount + 1}`);
    }
  }
}

module.exports = HandleEtranResponse;
