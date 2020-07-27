data "aws_route53_zone" "stagingsbadotgov" {
  name = "sba.gov."
}

resource "aws_iam_role" "s3_profitgizmo_staging_iam_role" {
    name = "s3_profitgizmo_staging_iam_role"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "s3_profitgizmo_staging_iam_role_policy" {
  name = "s3_profitgizmo_staging_iam_role_policy"
  role = aws_iam_role.s3_profitgizmo_staging_iam_role.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::profit-gizmo.staging.sba.gov"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::profit-gizmo.staging.sba.gov/*"]
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "profit_gizmo_staging_bucket" {
    bucket = "profit-gizmo.staging.sba.gov"
    acl = "public-read"
    website {
      index_document = "index.html"
      error_document = "error.html"
    }
    tags = {
      Name        = "Profit Gizmo Bucket"
      Environment = "staging"
    }
}

resource "aws_s3_bucket_policy" "profit_gizmo_staging_bucket" {
  bucket = aws_s3_bucket.profit_gizmo_staging_bucket.id

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::profit-gizmo.staging.sba.gov/*"
        }
    ]
}
POLICY
}