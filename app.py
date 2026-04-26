from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>DevOps Pipeline Running!</h1><p>Experiment 9 - Cloud CI/CD</p>"

@app.route('/health')
def health():
    return {"status": "healthy", "port": 5009}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5009, debug=True)
