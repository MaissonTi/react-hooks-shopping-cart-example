import produce from 'immer';

export default function cartt(state = [], action) {
  switch (action.type) {
    case '@cart/ADD':
      return produce(state, draft => {
        const itemIndex = draft.findIndex(p => p.id === action.item.id);

        if (itemIndex >= 0) {
          draft[itemIndex].amount += 1;
        } else {
          draft.push({
            ...action.item,
            amount: 1,
          });
        }
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const itemIndex = draft.findIndex(p => p.id === action.id);

        if (itemIndex >= 0) {
          draft.splice(itemIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT': {
      if (action.amount <= 0) {
        return state;
      }

      return produce(state, draft => {
        const itemIndex = draft.findIndex(p => p.id === action.id);

        if (itemIndex >= 0) {
          draft[itemIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
