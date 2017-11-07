import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Post } from '../model/post';
import { SubredditPost } from '../model/subreddit'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostService {
    
    constructor(private http: Http) { 
    }

    getPosts(searchCriteria:any) : Observable<Post[]>{
        let params: URLSearchParams = new URLSearchParams();
        params.set('title', searchCriteria);

        return this.http.get("http://localhost:3000/getPosts", { search: params })
                .map((res:any) => {
                    return res.json();
                })
                .catch((error:any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error')
                }); 
    }

    getPostssub(searchCriteria:any) : Observable<SubredditPost[]>{
        let params: URLSearchParams = new URLSearchParams();
        params.set('subreddit_cat', searchCriteria);

        return this.http.get("http://localhost:3000/getPostssub", { search: params })
                .map((res:any) => {
                    console.log(res.json);
                    return res.json();
                })
                .catch((error:any) => {
                    console.log(error);
                    return Observable.throw(error.json ? error.json().error : error || 'Server error')
                }); 
    }

    insertNewPost(post:Post): Observable<any>{
        return this.http.post("http://localhost:3000/insertPost", post)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            }); 
    }

    updatePost(post:Post): Observable<any>{
        return this.http.post("http://localhost:3000/updatePost", post)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            }); 
    }

    deletePost(post:Post): Observable<any>{
        return this.http.post("http://localhost:3000/deletePost", { id: post._id })
        .map((res:any) => {
            return res.json();
        })
        .catch((error:any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error')
        });
    }
}