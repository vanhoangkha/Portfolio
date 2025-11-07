#!/usr/bin/env python3
import boto3
import requests
import sys

# Pre-signed URL from deployment creation
upload_url = "https://aws-amplify-prod-ap-southeast-1-artifacts.s3.ap-southeast-1.amazonaws.com/d2y2voizcsqkbs/master/0000000001/DEPLOY/artifacts.zip?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkcwRQIga7RvN5a1KrMi6vL2oJAjrcqX4uThRWxZKoymK%2BNvS7ECIQCtuPjuJ%2FRJTmadsu1pvwuiK3jIDgEmeqGoLQnRSNQLzyrNAwix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAQaDDE0ODQxNDUxODgzNyIMF9q8eKB5cbKiA0DFKqEDHdF%2BTojQVcD6QDrM%2BtXrUaENjm0J13DIX44e9hXKDFOKrmYLaYhCct4nk9OwqkmdSl7cgF87h6MMvzsM1VuqKzjW1xaDx%2FTsM%2Fka7elMV6uzPyyZubhr%2FRRuIq98qTWRU02wCzacAGw2XbmVlP7xlAmURgThwk3GRnmmSMw5Q%2FPTFAeLpfiMjUCO90HMB9wiODU%2BWrAxWoQ8b%2F5iHk7Xk7Xu0UygDSM4gmwfaKBPNYnSlohKcHEg9fS6wDFFb7HkOWJy2MM1Z0gluCRBbxNtSZ36%2BVZGM01Y7qKYgJLd0ZLkh%2Bsy9FoI6pQ6wnyO3UIuvpaEONASyM4mGbMyMPX%2BkOyW3sM1nUuuKoDCIT0yUFHy7Si8lQnuqJm6dH3sq5%2FKQ4x0nwVg1JQXaFfcGw%2Bz2PhCrP9aSiChZGsdqzfyNbrJfOf%2FFRD8OhX%2Fe5YC%2FWAbZrCtYIqrolmzKJJHEXgk2ED8FF29NfLNNdnHTVhm60MVPIi8ZEvG8%2Ftrs9zXYbyR3u04%2FtfbxcA2q1u4dxFZqP89%2FAlGgJakK91IIMoa4OWBMIXxtMgGOp4BeYI6PVw5r8C0Go5oxZVwowkOo8ns8xxap8qExb1uFpBg%2BDB453XY9BOvrcV%2Fmjkh8qU5e6Kio1wVQJXQh3%2BfH24HaUfzvLaUS9vuPvjLW4urMtZiQOp6gEF10AztwKoJe0miY%2FYk02tPVXczOfqL36AP348CBAZF0AsfQfcEzUj9YSXtvYd08QPoJdl1Rn4%2B9VvYcJMBn7gG%2F80IuWY%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251107T034932Z&X-Amz-SignedHeaders=host&X-Amz-Expires=10800&X-Amz-Credential=ASIASFDRR2Y2ZQL36DNG%2F20251107%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=eec839ee26235c62b5c7073a6cd7eb615f4f6318cbae745d59d2e012d3707bf3"

zip_file = "/home/ubuntu/Portfolio/portfolio-frontend.zip"

print("Uploading to Amplify...")
try:
    with open(zip_file, 'rb') as f:
        response = requests.put(
            upload_url,
            data=f,
            headers={'Content-Type': 'application/zip'}
        )

    print(f"Status code: {response.status_code}")
    if response.status_code == 200:
        print("✅ Upload successful!")

        # Start the deployment
        client = boto3.client('amplify', region_name='ap-southeast-1')
        result = client.start-deployment(
            appId='d2y2voizcsqkbs',
            branchName='master',
            jobId='1'
        )
        print(f"Deployment started: {result}")
    else:
        print(f"❌ Upload failed: {response.text}")
        sys.exit(1)

except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
