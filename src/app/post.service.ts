import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';

const perPage = 6;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(page, tag, category): Observable<BlogPost[]> {
    let url = `https://niablog-api.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`;
    if (tag) url = url + '&tag=' + tag;
    if (category) url = url + '&category=' + category;

    return this.http.get<BlogPost[]>(url);
  }

  getPostById(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(
      `https://niablog-api.herokuapp.com/api/posts/${id}`
    );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(
      `https://niablog-api.herokuapp.com/api/categories`
    );
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(
      `https://niablog-api.herokuapp.com/api/tags`
    );
  }
}
