upload:
	# update resume
	cp ~/Downloads/resume.pdf ./static/resume/
	cp ~/Downloads/resume.pdf ~/GoogleDrive/documents/XiaochenCui-resume

	hugo
	git add --all
	git commit -v -a -m "update blog content"
	git push

install:
	brew install hugo
	git clone git@github.com:XiaochenCui/hugo-theme-yinyang.git themes/yinyang

local:
	hugo server -D
