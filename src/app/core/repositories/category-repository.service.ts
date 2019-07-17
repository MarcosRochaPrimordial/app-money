import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryRepositoryService {

  colectionName: string = 'category';

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.afs.collection<Category>(this.colectionName)
      .snapshotChanges().pipe(
        map((docs: DocumentChangeAction<Category>[]) => {
          return this.toCategory(docs);
        })
      );
  }

  toCategory(docs: DocumentChangeAction<Category>[]) {
    return docs.map(doc => {
      return {
        id: doc.payload.doc.id,
        ...doc.payload.doc.data()
      } as Category;
    });
  }

  save(category: Category) {
    this.afs.collection(this.colectionName).add(category);
  }

  delete(id: string) {
    this.afs.doc(`${this.colectionName}/${id}`).delete();
  }
}
