from flask import Flask
from flask import render_template
from flask import request
import os
import shutil

UPLOAD_FOLDER = "./uploadFiles/"
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'dmg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route("/")
def hello():
    return "hello world"

@app.route("/api/testAjax")
def testAjax():
    return render_template("ajaxTest.html")

@app.route("/api/testLog")
def testLog():
    return render_template("logTest.html")

@app.route("/api/testAjax/uploadFormData", methods=['POST', 'GET'])
def uploadFormdata():
    if request.method == "POST":
        usrName = request.form['usrName']
        usrPwd = request.form['usrPwd']
        if usrName == usrPwd:
            return "Congratuation"
        else:
            return "Sorry"

@app.route("/api/testAjax/uploadFile", methods=['POST', 'GET'])
def uploadFile():
    if request.method == "POST":
        file = request.files['file']
        if file and allowed_file(file.filename):
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], file.filename))
            return "Upload file successful!!"


def replaceDestFiles(src, dest):
    for src_dir, dirs, files in os.walk(src):
        dest_dir = src_dir.replace(src, dest)
        if not os.path.exists(dest_dir):
            os.mkdir(dest_dir)
        for file_ in files:
            src_file = os.path.join(src_dir, file_)
            dest_file = os.path.join(dest_dir, file_)
            if os.path.exists(dest_file):
                os.remove(dest_file)
            shutil.copy(src_file, dest_dir)

if __name__ == "__main__":
    print os.listdir("../../src")
    replaceDestFiles("../../src/", "./static/js/src/")
    print os.listdir("./static/js/src/")
    app.run()
