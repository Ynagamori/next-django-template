# tech_blog

# frontend 初回起動
docker exec -it tech_blog-frontend-1 bash
cd gamog_project
npm upgrade
npm run dev

# backend 初回起動
docker exec -it tech_blog-backend-1 bash
python manage.py makemigrations
python manage.py migrate

# backend ソース変更
ps -a | grep gunicorn
kill -HUP <一番小さいプロセスID>