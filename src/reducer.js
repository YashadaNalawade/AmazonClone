//reducer is how data is pushed into data layer, it listens
//The reducer is a place where you declare all the application level states which can be used later by the application.


export const initialState = {
    basket : [],
    user : null,
}

// Selector
export const getBasketTotal = (basket) =>
basket?.reduce((amount, item) => item.price + amount, 0) //reduce goes through the basket(all items) and tallys up the total so basically just a fancy way to use a for loop and add all values


const reducer = (state, action) =>{ //action is adding or removing from basket, The state and action is provided so that the reducer can perform operations on the state.
    console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return{
                ...state,
                basket : [...state.basket,action.item],
            };

        case 'EMPTY_BASKET':
        return{
            ...state,
            basket : []  //emptying out the basket
        };

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if(index >= 0){
                newBasket.splice(index,1)

            }
            else{
                console.warn(`Can't remove product (id: ${action.id}) as it's not in basket!`)
            }

            return{
                ...state,
                basket: newBasket
            }

            case "SET_USER":
                return{
                    ...state,
                    user :action.user
                }

        default:
            return state;

    }

};

export default reducer;