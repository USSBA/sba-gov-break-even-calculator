const StepBase = require('@aws-ee/services/lib/workflow/helpers/step-base');

class CallEtran extends StepBase {
  async start() {
    const [requestContext, transactionId, rawData, elenService, etranTransactionService] = await Promise.all([
      this.payload.object('requestContext'),
      this.payload.string('transactionId'),
      this.payload.object('rawData'),
      this.mustFindServices('elenService'),
      this.mustFindServices('etranTransactionService'),
    ]);

    this.print(`${transactionId}: calling etran`);

    try {
      await etranTransactionService.update(requestContext, { transactionId, status: 'PROCESSING' });
      const response = await elenService.originate(requestContext, rawData);
      await this.payload.setKey('etranResponse', response);
    } catch (error) {
      this.print(`${transactionId}: error caught ${error.message}`);
      await this.payload.setKey('error', error);
      throw error;
    }
    this.print(`${transactionId}: finished etran call`);
    this.payload.setKey('etranCallLambdaFinished', 'finished');
  }
}

module.exports = CallEtran;
