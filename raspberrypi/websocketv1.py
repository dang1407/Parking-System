from flask import Flask, jsonify, request
from flask_cors import CORS
import asyncio
import datetime
import random
import websockets

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://example.com"}})
CORS(app, resources={r"/*": {"origins": "*"}})
# Một danh sách giả lập các sản phẩm
products = [
    {"id": 1, "name": "Product 1", "price": 9.99},
    {"id": 2, "name": "Product 2", "price": 19.99},
    {"id": 3, "name": "Product 3", "price": 29.99}
]

# Lấy danh sách tất cả sản phẩm
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

# Lấy thông tin của một sản phẩm cụ thể
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    else:
        return jsonify({"error": "Product not found"}), 404

# Tạo một sản phẩm mới
@app.route('/products', methods=['POST'])
def create_product():
    new_product = request.get_json()
    new_product['id'] = len(products) + 1
    products.append(new_product)
    return jsonify(new_product), 201



if __name__ == '__main__':
    app.run(debug=True, host= "0.0.0.0")