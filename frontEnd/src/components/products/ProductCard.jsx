import React from 'react'

// The product card is include in the restroPage itself.
const ProductCard = ({ food, key }) => {
    function handleEditFoodItem() {
        console.log("Edit Food Item");
        // Call the edit food item function from backend using patch request
        //MAintain the states using redux and update the todos so that the restro homepage shows the edited items
    }
    function handleDeleteFoodItem() {
        console.log("Deleting Food Item");
        // Call the delete food item function from backend using delete request
        //Maintain the states using redux and update the todos so that the restro homepage shows the deleted items
    }
    return (
        <div className='flex flex-col gap-2 border bg-white p-4 rounded-lg shadow-lg w-[350px]'>
            <img src={food.image} alt={food.name} />
            <h3 className=''>{food.name}</h3>
            <p>{food.description}</p>
            <div className='flex justify-between items-center'>
                <p>Only ${food.availableQty} left in stock!</p>
                <p className='text-lg font-bold text-purple-900'>Price: ${food.price}</p>
            </div>
            <div className='flex justify-end gap-2'>
                <button onClick={handleEditFoodItem} className='text-blue-600 font-bold'>Edit</button>
                <p>|</p>
                <button onClick={handleDeleteFoodItem} className='text-red-600 font-bold'>Delete</button>
            </div>
        </div>
    )
}

export default ProductCard
