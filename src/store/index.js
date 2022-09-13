import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { loadState } from "../utility/browser-storage";

import AuthRedux from './AuthRedux';
import VideosRedux from './VideosRedux';
import createVideoData from "./VideoData";
import ProductsRedux from './ProductsRedux';
import PagesRedux from './PagesRedux';
import CategoriesRedux from './CategoriesRedux';
import AdminsRedux from './AdminsRedux';
import TestmastersRedux from './TestmastersRedux';
import HashtagsRedux from './HashtagsRedux';
import CustomersRedux from './CustomersRedux';
import StoriesRedux from './StoriesRedux';
import UsersRedux from './UsersRedux';

const reducers = combineReducers({
  auth: AuthRedux,
  video: VideosRedux,
  createVideoData: createVideoData,
  product: ProductsRedux,
  pages: PagesRedux,
  categorie: CategoriesRedux,
  admins: AdminsRedux,
  testmasters: TestmastersRedux,
  customers: CustomersRedux,
  hashtag: HashtagsRedux,
  stories: StoriesRedux,
  users: UsersRedux,
});

export const store = configureStore({
  devTools: true,
  reducer: reducers,
  preloadedState: loadState('redux'),
});