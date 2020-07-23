output "s3_domain" { 
    value = aws_s3_bucket.profit_gizmo_dev_bucket.website_domain
}

output "zone_id" {
    value = aws_s3_bucket.profit_gizmo_dev_bucket.hosted_zone_id
} 

output "s3_id" { 
    value = aws_s3_bucket.profit_gizmo_dev_bucket.id
}

output "s3_endpoint" { 
    value = aws_s3_bucket.profit_gizmo_dev_bucket.website_endpoint
}

output "s3_bucket_domain" { 
    value = aws_s3_bucket.profit_gizmo_dev_bucket.bucket_domain_name
}

output "s3_dev_bucket" {
  value = aws_s3_bucket.profit_gizmo_dev_bucket.bucket
} 

output "s3_dev_bucket_regional_name" {
    value = aws_s3_bucket.profit_gizmo_dev_bucket.bucket_regional_domain_name
}