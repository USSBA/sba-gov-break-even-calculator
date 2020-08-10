data "aws_acm_certificate" "contentsbadotgov" {
  domain      = "content.sba.gov"
  types       = ["AMAZON_ISSUED"]
  most_recent = true
}

resource "aws_cloudfront_distribution" "profit_gizmo_prod_s3_distribution" {
  // origin is where CloudFront gets its content from.
  origin {
    custom_origin_config {
      // These are all the defaults.
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    // Here we're using our S3 bucket's URL!
    domain_name = aws_s3_bucket.profit_gizmo_prod_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.profit_gizmo_prod_bucket.bucket
  }

  enabled             = true
  default_root_object = "index.html"

  // All values are defaults from the AWS console.
  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    // This needs to match the `origin_id` above.
    target_origin_id       = aws_s3_bucket.profit_gizmo_prod_bucket.bucket
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  // Here we're ensuring we can hit this distribution using www.runatlantis.io
  // rather than the domain name CloudFront gives us.
  aliases = ["${aws_s3_bucket.profit_gizmo_prod_bucket.bucket}"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
      Name        = "Profit Gizmo S3 Bucket Cloudfront Distribution"
      Environment = "production"
    }

  // Here's where our certificate is loaded in!
  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.contentsbadotgov.arn
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "prod_root_domain" {
  zone_id = data.aws_route53_zone.sbadotgov.zone_id
  name = "profit-gizmo.www.sba.gov"
  type = "A"

  alias {
    name = aws_cloudfront_distribution.profit_gizmo_prod_s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.profit_gizmo_prod_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}