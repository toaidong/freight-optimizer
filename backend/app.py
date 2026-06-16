from flask import Flask, request, jsonify
from flask_cors import CORS
from py3dbp import Packer, Bin, Item

app = Flask(__name__)
CORS(app)

@app.route('/pack', methods=['POST'])
def pack():
    data = request.json
    
    # get truck dimensions from request
    truck = data['truck']
    items = data['items']
    
    # set up packer
    packer = Packer()
    packer.add_bin(Bin(
        truck['name'],
        truck['width'],
        truck['height'],
        truck['depth'],
        truck['max_weight']
    ))
    
    # add items
    for i, item in enumerate(items):
        packer.add_item(Item(
            f"item_{i}",
            item['width'],
            item['height'],
            item['depth'],
            item['weight']
        ))
    
    packer.pack()
    
    # format results
    result = []
    for b in packer.bins:
        for item in b.items:
            result.append({
                'name': item.name,
                'position': item.position,
                'dimension': item.get_dimension()
            })
    
    return jsonify({'packed_items': result})

if __name__ == '__main__':
    app.run(debug=True)