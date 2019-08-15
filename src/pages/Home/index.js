import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdStar } from 'react-icons/all';
import { MdAddShoppingCart } from 'react-icons/md';
import Container from '../../components/Container';
import { ComicList, Button, Star } from './styles';

import * as CardActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';

import json from '../../services/jsonApiMarvel';

import { formatPrice } from '../../util/format';

export default function Home() {
  const [comics, setComics] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, item) => {
      sumAmount[item.id] = item.amount;
      return sumAmount;
    }, {})
  );
  const favorite = useSelector(state => JSON.stringify(state.favorite));

  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      const data = json.data.map(comic => ({
        ...comic,
        priceFormat: formatPrice(comic.prices[0].price),
      }));

      setComics(data);
    }
    load();
  }, []);

  const handleAddComic = item => {
    dispatch(CardActions.addToCart(item));
  };

  const handleStarComic = item => {
    dispatch(FavoriteActions.flagFavorite(item));
  };

  return (
    <Container>
      <ComicList>
        {comics.map(item => (
          <li key={item.id}>
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt={item.title}
            />
            <strong>{item.title}</strong>
            <Star cor={favorite.indexOf(item.id)}>
              <span>
                {item.priceFormat} {item.color}
              </span>
              <MdStar onClick={() => handleStarComic(item)} size={25} />
            </Star>

            <Button onClick={() => handleAddComic(item)}>
              <div>
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {amount[item.id] || 0}
                </div>
                <span>Add to cart </span>
              </div>
            </Button>
          </li>
        ))}
      </ComicList>
    </Container>
  );
}
