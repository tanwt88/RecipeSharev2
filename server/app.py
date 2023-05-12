from flask import Flask, request, jsonify,make_response, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from sqlalchemy.dialects.postgresql import *
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

from config import ApplicationConfig
from models import db, User, Recipe, Feedback, Report, Admin

app = Flask(__name__)
app.config.from_object(ApplicationConfig)


#cors=CORS(app)
CORS(app, origins=['http://localhost:3000'])
bcrypt = Bcrypt(app)
#CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "DELETE"]}})
server_Session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

#Register New User
@cross_origin
@app.route("/register", methods=["POST"])
def register_user():
    print(request)
    email = request.json["email"]
    password = request.json["password"]
    country= request.json["country"]
    name=email.split('@'),[0]
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(name=name,country = country, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
#Post User Login
@app.route("/login", methods=["POST","OPTIONS"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    Session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

#get user information at homepage
@cross_origin
@app.route("/home/<string:id>", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorised"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
     "id": user.id,
    "email": user.email
    })

#Get recipe information and display on homepage
@app.route("/home/<string:id>", methods=["GET"])
def recipe_card_data(id):
    recipe_name = request.json("recipes.name")
    recipe_calories = request.json("recipes.calories")
    recipe_total_time = request.json("recipes.total_time")
    recipe_created_at = request.json("recipes.created_at")
    recipe_creator = request.json("recipes.user_id")
    recipe_ratings = request.json("recipes.ratings")
    recipe_favourites = request.json("recipes.favourites")

    recipe_card_data = {
        "name": recipe_name,
        "calories": recipe_calories,
        "total_time": recipe_total_time,
        "created_at": recipe_created_at,
        "created by": recipe_creator,
        "ratings": recipe_ratings,
        "favourites": recipe_favourites
    }

    return jsonify(recipe_card_data)
    
#Delete recipe on homepage
@app.route("/home/<string:id>", methods=["DELETE"])
def delete_recipe(id):
    recipe = Recipe.query.filter_by(id=id).first()
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({"message": "Recipe deleted successfully"})

#create new recipe
@app.route('/home/<string:id>/newrecipes',methods=["POST"])
def create_recipe(id):
    name=request.json["name"]
    photo_url = request.json["photo_url"]
    ingredients = request.json["ingredients"]
    directions = request.json["directions"]
    video_url = request.json["video_url"]
    cooking_time = (request.json["cooking_time"])
    prep_time = (request.json["prep_time"])
    calories = request.json["calories"]
    total_time= prep_time + cooking_time

    new_recipe = Recipe(
    name = name,  
    photo_url=photo_url,
    ingredients = ingredients,
    directions = directions,
    video_url= video_url,
    cooking_time= cooking_time,
    prep_time= prep_time,
    calories = calories,
    total_time = total_time,
    user_id=id
    )
    
    
    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({
    "recipe_id": new_recipe.id,
    "name": new_recipe.name,
    "photo_url":new_recipe.photo_url,
    "ingredients" : new_recipe.ingredients,
    "directions" : new_recipe.directions,
    "video_url": new_recipe.video_url,
    "cooking_time": new_recipe.cooking_time,
    "prep_time": new_recipe.prep_time,
    "calories" : new_recipe.calories,
    "total_time" : new_recipe.total_time,
    "user_id" : new_recipe.user_id,
    "ratings": new_recipe.ratings,
    "favourite": new_recipe.favourite
})

#Edit and delete at Recipe Page
@app.route('/home/<string:id>/recipes/<string:recipe_id>', methods=["PUT"])
def edit_recipe(id, recipe_id):
    recipe = Recipe.query.filter_by(id=recipe_id, user_id=id).first()
    if not recipe:
        return jsonify({"message": "Recipe not found"}), 404

    recipe.name = request.json.get('name', recipe.name)
    recipe.photo_url = request.json.get('photo_url', recipe.photo_url)
    recipe.ingredients = request.json.get('ingredients', recipe.ingredients)
    recipe.directions = request.json.get('directions', recipe.directions)
    recipe.video_url = request.json.get('video_url', recipe.video_url)
    recipe.cooking_time = request.json.get('cooking_time', recipe.cooking_time)
    recipe.prep_time = request.json.get('prep_time', recipe.prep_time)
    recipe.calories = request.json.get('calories', recipe.calories)
    recipe.total_time = recipe.prep_time + recipe.cooking_time

    db.session.commit()

    if request.args.get('delete') == 'true':
        db.session.delete(recipe)
        db.session.commit()
    return jsonify({"message": "Recipe deleted successfully"}), 200
    
    return jsonify({
        "recipe_id": recipe.id,
        "name": recipe.name,
        "photo_url": recipe.photo_url,
        "ingredients": recipe.ingredients,
        "directions": recipe.directions,
        "video_url": recipe.video_url,
        "cooking_time": recipe.cooking_time,
        "prep_time": recipe.prep_time,
        "calories": recipe.calories,
        "total_time": recipe.total_time,
        "user_id": recipe.user_id,
        "ratings": recipe.ratings,
        "favourite": recipe.favourite
    }), 200

#Create report on report page
@app.route('/home/<string:id>/report', methods=['POST'])
def create_report():
    data = request.json
    reportedUserEmail = data['reported_user_email']
    reason = data['reason']
    report_user = data['report_user']
    created_at = datetime.strptime(data['created_at'], '%Y-%m-%dT%H:%M:%S.%fZ')
    report = {
        'reported_user': report.reportedUserEmail,
        'reason': report.reason,
        'report_by': report.report_user,
        'created_at': report.created_at
    }
    report.append(report)
    
    db.session.add(report)
    db.session.commit()

    return jsonify(report)

#Create feedback route
@app.route('/home/<string:id>/feedback', methods=['POST'])
def post_feedback(id):
    
    user_id = request.json.get["user_id"]
    subject = request.json.get["subject"]
    description = request.json.get["description"]
    created_at= datetime.now().isoformat()
    feedback = Feedback(user_id=user_id,subject= subject,description = description, created_at=created_at)
    
    db.session.add(feedback)
    db.session.commit()
    
    return jsonify(feedback)

#Post Admin User Login
@app.route("/admin", methods=["POST"])
def login_admin():
    email = request.json["email"]
    password = request.json["password"]

    admin = Admin.query.filter_by(email=email).first()

    if admin is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(User.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    Session["admin_id"] = Admin.id

    return jsonify({
        "id": admin.id,
        "email": admin.email
    })
    
#Show recipe on admin homepage
@app.route("/admin/<string:id>", methods=["GET"])
def recipe_card(id):
    recipe_name = request.json("recipes.name")
    recipe_calories = request.json("recipes.calories")
    recipe_total_time = request.json("recipes.total_time")
    recipe_created_at = request.json("recipes.created_at")
    recipe_creator = request.json("recipes.user_id")
    recipe_ratings = request.json("recipes.ratings")
    recipe_favourites = request.json("recipes.favourites")

    recipe_card = {
        "name": recipe_name,
        "calories": recipe_calories,
        "total_time": recipe_total_time,
        "created_at": recipe_created_at,
        "created by": recipe_creator,
        "ratings": recipe_ratings,
        "favourites": recipe_favourites
    }

    return jsonify(recipe_card)

#delete recipe at admin homepage
@app.route("/admin/<string:id>", methods=["DELETE"])
def admin_delete_recipe():
    db.session.delete(Recipe)
    db.session.commit()
    return jsonify({"message": "Recipe deleted successfully"})


#Show recipe created by user
@app.route('/home/<string:id>/myrecipe', methods= ['GET'])
def my_recipe(id):
    recipe=Recipe.query.filter_by(user_id=id).first()
    if recipe is None:
        # If the recipe does not exist or does not belong to the user, return a 404 error
        return make_response(jsonify({'error': 'Recipe not found'}), 404)
    
    return jsonify({
        'id': recipe.id,
        'name': recipe.name,
        'photo_url': recipe.photo_url,
        'ingredients': recipe.ingredients,
        'directions': recipe.directions,
        'video_url': recipe.video_url,
        'cooking_time': recipe.cooking_time,
        'prep_time': recipe.prep_time,
        'calories': recipe.calories,
        'total_time':recipe.total_time,
        'user_id': recipe.user_id,
        'ratings': recipe.ratings,
        'favourite': recipe.favourite,
        'created_at': recipe.created_at,
    })
    

@app.route('/home/<string:recipe_id>/favourites', methods=['GET'])
def favourites_recipe(id):
    # Retrieve the recipe with the specified id that belongs to the logged in user
    recipe = Recipe.query.filter_by(favourites=True).first()

    if recipe is None:
        # If the recipe does not exist or does not belong to the user, return a 404 error
        return make_response(jsonify({'error': 'Recipe not found'}), 404)

    # Return a JSON representation of the recipe
    return jsonify({
        'id': recipe.id,
        'name': recipe.name,
        'photo_url': recipe.photo_url,
        'ingredients': recipe.ingredients,
        'directions': recipe.directions,
        'video_url': recipe.video_url,
        'cooking_time': recipe.cooking_time,
        'prep_time': recipe.prep_time,
        'calories': recipe.calories,
        'user_id': recipe.user_id,
        'ratings': recipe.ratings,
        'favourite': recipe.favourite,
        'created_at': recipe.created_at,
    })
   
#Show report on reportmoderator page
@app.route("/admin/<string:id>/reportmoderator", methods=["GET"])
def get_report():
    reported_user = request.json("report.reportedUserEmail")
    reason = request.json("report.reason")
    report_by = request.json("report.report_user")
    report_created_at = request.json("report.created_at")

    report = {
        "reported_user": reported_user,
        "reason": reason,
        "report_by": report_by,
        "created_at": report_created_at,
    }

    return jsonify(report)

#delete route at report moderator page
@app.route("/admin/<string:id>/reportmoderator", methods=["DELETE"])
def delete_report():
    db.session.delete(Report)
    db.session.commit()
    return jsonify({"message": "Report deleted successfully"})

#delete user route at report moderator page
@app.route("/admin/<string:id>/reportmoderator", methods=["DELETE"])
def delete_user():
    db.session.delete(User)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"})

#Show feedback on feedbackmoderator page
@app.route("/admin/<string:id>/feedbackmoderator", methods=["GET"])
def get_feedback(id):
    user_id = request.json("feedback.user_id")
    subject = request.json("feedback.subject")
    description = request.json("feedback.description")
    created_at = request.json("feedback.created_at")
    
    report = {
        "user_id": user_id,
        "subject": subject,
        "description": description,
        "created_at": created_at,
    }

    return jsonify(report)



#delete feedback route at feedback moderator page
@app.route("/admin/<string:id>/reportmoderator", methods=["DELETE"])
def delete_feedback():
    db.session.delete(Feedback)
    db.session.commit()
    return jsonify({"message": "Feedback deleted successfully"})

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


if __name__ == "__main__":
    app.run(host = "0.0.0.0", port =5000, debug=True, ssl_context=("cert.pem","key.pem"))
