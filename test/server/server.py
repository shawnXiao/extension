from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return "hello world"

@app.route("/api/testAjax")
def testAjax():
    return render_template("ajaxTest.html")


if __name__ == "__main__":
    app.run()

