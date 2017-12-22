# Leosac-web nginx configuration file
server {
	      listen 8080;

	      root /home/stagiaire/leosac-gui/leosac-web/dist/;

	      index index.html index.htm;

	      location /
	      {
	      try_files $uri $uri/ =404;
	      }
}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#	listen 80;
#	listen [::]:80;
#
#	server_name example.com;
#
#	root /var/www/example.com;
#	index index.html;
#
#	location / {
#		try_files $uri $uri/ =404;
#	}
#}
