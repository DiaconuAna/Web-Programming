import {Author} from "./author";
import {Type} from "./type";

export class Recipe{
  constructor(
    public id: number,
    //public authorId: number,
    //public typeId: number,
    public name: string,
    public description: string,
    public firstName: string,
    public lastName: string,
    public typeDescr: string,

  ){}
}
