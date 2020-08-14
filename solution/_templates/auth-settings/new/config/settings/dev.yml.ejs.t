---
inject: true
to: ../config/settings/dev.yml
before: Auth Insertion Point
---
# Auth - App Client ID
# This can be ANY UUID at the moment as long as the same ID value is used on the UI as well
# Make sure to have the same value in solution/ui/config/settings/dev.yml file
appClientId: 03c4c6170805dab483afbde1ff72cdec


# Auth - SAML SP configuration
# The service provider id configured on the idp (connect.sba.gov) side.
serviceProviderId:  https://devlendergateway.sba.gov/

# SBA Connect Metadata URL
# The location where the SBA Connect identity provider's SAML metadata can be found
# This is used to detect the SingleSignIn and SingleLogOut URLs as well as to retrieve
# the cert that can be used to verify SAML response signatures from SBA Connect
sbaConnectMetadataUrl: https://connect.ussba.io/saml/metadataservice
