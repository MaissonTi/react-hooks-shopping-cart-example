import produce from 'immer';

export default function checkFavorite(state = [], action) {
  switch (action.type) {
    case '@star/FLAG':
      return produce(state, draft => {
        const itemIndex = draft.findIndex(id => id === action.item.id);
        if (itemIndex >= 0) {
          draft.splice(itemIndex, 1);
        } else {
          draft.push(action.item.id);
        }
      });
    default:
      return state;
  }
}
