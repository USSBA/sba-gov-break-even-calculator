---
to: infrastructure/config/settings/.defaults.yml
---
# The S3 bucket name to be used to host the static website
websiteBucketName: ${self:custom.settings.globalNamespace}-website
websiteDomain: ""

# CF DefaultCacheBehavior Settings
#
# DefaultTTL
# The default amount of time that you want objects to stay in CloudFront
# caches before CloudFront forwards another request to your origin to determine
# whether the object has been updated.
cloudfrontDefaultTtl: 0

# MinTTL
# The minimum amount of time that you want objects to stay in CloudFront
# caches before CloudFront forwards another request to your origin to determine
# whether the object has been updated.
cloudfrontMinTtl: 0

# MaxTTL
# The maximum amount of time that you want objects to stay in CloudFront
# caches before CloudFront forwards another request to your origin to determine
# whether the object has been updated.
cloudfrontMaxTtl: 0
