# example_appcm

# frontend 初回起動
docker exec -it example_app-frontend-1 bash
cd example_app
npm upgrade
npm run dev

# backend 初回起動
docker exec -it example_app-backend-1 bash
python manage.py makemigrations
python manage.py migrate

# backend ソース変更
ps -a | grep gunicorn
kill -HUP <一番小さいプロセスID>