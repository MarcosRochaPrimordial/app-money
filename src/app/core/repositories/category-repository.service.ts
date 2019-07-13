import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryRepositoryService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.afs.collection<Category>('category')
      .valueChanges();
  }
}
