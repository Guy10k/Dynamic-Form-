from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_db

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing
db = get_db()

db.form_definitions.delete_many({})  # Clear existing definitions
db.form_definitions.insert_many([
    {
        "name": "firstName",
        "required": True,
        "type": "string"
    },
    {
        "name": "lastName",
        "required": True,
        "type": "string"
    },
    {
        "name": "age",
        "required": True,
        "type": "float"
    },
    {
        "name": "startDate",
        "required": True,
        "type": "date"
    },
    {
        "name": "endDate",
        "required": True,
        "type": "date"
    },
    {
        "name": "iAgreeForTermsAndCondition ",
        "required": False,
        "type": "bool"
    }



])


# Endpoint: GET /form_definitions
@app.route('/form_definitions', methods=['GET'])
def get_form_definition():
    form_definitions = list(db.form_definitions.find({}, {'_id': 0}))  # Fetch without _id
    print(form_definitions)

    if not form_definitions:
        return jsonify({"error": "No form definitions found"}), 404
    return jsonify(form_definitions), 200


# Endpoint: POST /save-parameters
@app.route('/user_response', methods=['POST'])
def save_parameters():

    user_data = request.json

    print(user_data)
    if not user_data:
        return jsonify({"error": "No data provided"}), 400

    db.user_response.insert_one(user_data)
    return jsonify({"message": "Response saved successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
