import { EntityAdapter } from "@reduxjs/toolkit";
import moment from "moment";

export const extractAdapterReducer = <T>(adapter: EntityAdapter<T>) => {
  return {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    setOne: adapter.setOne,
    setMany: adapter.setMany,
    setAll: adapter.setAll,
    removeOne: adapter.removeOne,
    removeMany: adapter.removeMany,
    removeAll: adapter.removeAll,
    updateOne: adapter.updateOne,
    updateMany: adapter.updateMany,
    upsertOne: adapter.upsertOne,
    upsertMany: adapter.upsertMany,
  };
};

export const late3HourMoment = (timestamp?: number) => moment((timestamp || Date.now()) - 3 * 60 * 60 * 1000);
