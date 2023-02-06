export interface IMainCarousel {
  id: number;
  imgUrl: string;
}
export interface IMainEvent {
  imgUrl: string;
  title: string;
  subTitle?: string;
  eventUrl?: string;
  id?: number;
}

export interface IMainEventDetail {
  imgUrl: string;
  title: string;
  description: string;
  uniqueIndex: string;
}

export interface IKeys {
  item: string;
  index: number;
}

export interface IBestSellerId {
  ulid: string;
}
