ĆWICZENIE 3: WŁĄCZ STATYCZNY HOSTING WITRYNY
INTERNETOWEJ DL A BUC KETA S3
1. Z konsoli usługi AWS S3 wybierz przycisk Create Bucket.
2. W uprawnieniach odblokuj dostęp publiczny.
3. Na karcie Properties bucketa włącz Static website hosting (statyczny hosting witryny).
Wpisz plik index.html jako dokument indeksu.
4. Utwórz prosty dokument html o nazwie index.html i wgraj go do bucketa. Pamiętaj o
nadaniu uprawnień Public read access.
5. To samo działanie uzyskasz w AWS CLI komendami:
aws s3api put-bucket-acl --bucket bucket-name --acl public-read
S TRONA 10
aws s3 website s3://bucket-name/ --index-document index.html --
error-document error.html
6. Skopiuj adres URL z Endpoint i wklej go do pola adresu URL przeglądarki, która nie jest
zalogowana na koncie AWS. Potwierdź, że możesz uzyskać dostęp do strony
internetowej.
7. Po zakończeniu ćwiczenia, nie kasuj jeszcze bucketa, przyda się do ćwiczenia z usługą
CloudFront.





http://koby5i-train-web.s3-website.eu-central-1.amazonaws.com
http://koby5i-train-web.s3-website.eu-central-1.amazonaws.com


aws s3 mb s3://koby5i-train-web
aws s3 ls

aws s3 cp index.html s3://koby5i-train-web
aws s3 cp error.html s3://koby5i-train-web
aws s3 cp aa.html    s3://koby5i-train-web

aws s3api put-object-acl --bucket koby5i-train-web --key index.html --acl public-read
aws s3api put-object-acl --bucket koby5i-train-web --key error.html --acl public-read
aws s3api put-object-acl --bucket koby5i-train-web --key aa.html    --acl public-read

aws s3api put-bucket-acl --bucket koby5i-train-web --acl public-read
aws s3 website s3://koby5i-train-web/ --index-document index.html --error-document error.html

