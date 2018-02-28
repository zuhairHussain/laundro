import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  constructor() { }

  public static serverApi = 'http://ec2-52-43-122-67.us-west-2.compute.amazonaws.com/laundromat/api/';

}
