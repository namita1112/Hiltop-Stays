import React from 'react';
import Title from './Title';
import FruitCard from './FruitCard'; 
import { assets } from '../assets/assets';

const fruits = [
  {
    id: 1,
    name: 'Litchis',
    images: [assets.litchi1, assets.litchi2, assets.litchi3],
    price: '₹199/kg',
    description: 'Fresh, juicy litchis directly from the farm.',
  },
  {
    id: 2,
    name: 'Strawberries',
    images: [assets.strawberry1, assets.strawberry3, assets.strawberry4],
    price: '₹149/kg',
    description: 'Sweet and organic strawberries picked with care.',
  },
  {
    id: 3,
    name: 'Gooseberries',
    images: [assets.gooseberry1, assets.gooseberry2],
    price: '₹99/kg',
    description: 'Healthy gooseberries packed with Vitamin C.',
  },
];

const FruitOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-10 pb-16'>
      <Title
        title='Fresh Fruits Available'
        subTitle='We also offer fresh seasonal fruits delivered to your doorstep.'
      />

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {fruits.map((fruit) => (
          <FruitCard key={fruit.id} fruit={fruit} /> 
        ))}
      </div>
    </div>
  );
};

export default FruitOffers;
