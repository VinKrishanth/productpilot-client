export {default as LogoImg} from  './logo.png';
export {default as profilePic} from  './user-profile.png';
export {default as aboutHeroPic} from  './about-hero.jpg';
export {default as aboutFeaturePic} from  './about-feature.jpg';
export {default as aboutDeliveryPic} from  './about-delivery.jpg';
export {default as aboutPartnerGroupPic} from  './Group.jpg';
export {default as aboutPartnerFoodPic} from  './food.jpg';
export {default as aboutPartnerMangoPic} from  './mango.jpg';
export {default as aboutPartnerVectorPic} from  './Vector.jpg';
export {default as aboutPartnerGroupYPic} from  './GroupY.jpg';
export {default as aboutCustomerPic1 } from  './customer-1.png';                 
export {default as aboutCustomerPic2 } from  './customer-2.png';                 
export {default as aboutCustomerPic3 } from  './customer-3.png';                 
export {default as aboutTeamPic1 } from  './team-1.png';                 
export {default as aboutTeamPic2 } from  './team-2.png';                 
export {default as aboutTeamPic3 } from  './team-3.png';                 
export {default as aboutTeamPic4 } from  './team-4.png';                 
export {default as adminDefaultPic } from  './admin-default.jpeg';                 
export {default as upload_area } from  './upload_area.png';                 


import BakingNeed from './category/baking-needs.png'
import BeautyHealth from './category/beauty-health.png'
import Beverages from './category/beverages.png'
import BreadBakery from './category/bread-bakery.png'
import Cooking from './category/cooking.png'
import DiabeticFood from './category/diabetic-food.png'
import DishDetergents from './category/dish-detergents.png'
import FreshFruit from './category/fresh-fruit.png'
import FreshVegetables from './category/fresh-vegetables.png'
import MeatFish from './category/meat-fish.png'
import Oil from './category/oil.png'
import Snacks from './category/snacks.png'


export const categories = [
    {
      name: "Fruit",
      path: "fruit",
      image: FreshFruit, 
      value: 'fruit'
    },
    {
      name: "Vegetables",
      path: "vegetables",
      image: FreshVegetables,
      value: 'vegetables'
    },
    {
      name: "Meat & Fish",
      path: "meat-fish",
      image: MeatFish,
      value: 'meat_fish'
    },
    {
      name: "Snacks",
      path: "snacks",
      image: Snacks,
      value: 'snacks'
    },
    {
      name: "Beverages",
      path: "beverages",
      image: Beverages,
      value: 'beverages'
    },
    {
      name: "Beauty",
      path: "beauty-health",
      image: BeautyHealth,
      value: 'beauty_health'
    },
    {
      name: "Bread & Bakery",
      path: "bread-bakery",
      image: BreadBakery,
      value: 'bakery'
    },
    {
      name: "Baking Needs",
      path: "baking-needs",
      image: BakingNeed,
      value: 'baking_need'
    },
    {
      name: "Cooking",
      path: "cooking",
      image: Cooking,
      value: 'cooking'
    },
    {
      name: "Diabetic Food",
      path: "diabetic-food",
      image: DiabeticFood,
      value: 'diabetic'
    },
    {
      name: "Detergents",
      path: "dish-detergents",
      image: DishDetergents,
      value: 'dish_detergent'
    },
    {
      name: "Oil",
      path: "Oil",
      image: Oil,
      value: 'oil'
    }
];
