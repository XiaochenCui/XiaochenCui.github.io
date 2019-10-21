upload:
	hugo
	git add --all
	git commit -v -a -m "update blog content"
	git push