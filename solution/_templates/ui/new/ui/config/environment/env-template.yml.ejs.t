---
    to: ui/config/environment/env-template.yml
---
# ========================================================================
# Variables shared between .env.local and .env.production
# ========================================================================

SKIP_PREFLIGHT_CHECK: true
REACT_APP_LOCAL_DEV: false
REACT_APP_AWS_REGION: ${self:custom.settings.awsRegion}
#REACT_APP_API_URL: ${self:custom.settings.apiUrl}
REACT_APP_WEBSITE_URL: ${self:custom.settings.websiteUrl}
REACT_APP_STAGE: ${self:custom.settings.envName}
REACT_APP_REGION: ${self:custom.settings.awsRegion}
REACT_APP_APP_CLIENT_ID: ${self:custom.settings.appClientId}
REACT_APP_BRAND_PAGE_TITLE: ${self:custom.settings.brandPageTitle}
REACT_APP_BRAND_MAIN_TITLE: ${self:custom.settings.brandMainTitle}
REACT_APP_BRAND_LOGIN_TITLE: ${self:custom.settings.brandLoginTitle}
REACT_APP_BRAND_LOGIN_SUBTITLE: ${self:custom.settings.brandLoginSubtitle}

# ========================================================================
# Overrides for .env.local
# ========================================================================

localOverrides:
  REACT_APP_LOCAL_DEV: true
  REACT_APP_API_URL: 'http://localhost:4000'
  REACT_APP_WEBSITE_URL: 'http://localhost:3000'
  REACT_APP_BRAND_PAGE_TITLE: LOCAL ${self:custom.settings.brandPageTitle}
