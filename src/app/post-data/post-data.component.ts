import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css'],
})
export class PostDataComponent implements OnInit {
  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;

  constructor(private route: ActivatedRoute, private pService: PostService) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.pService.getPostById(params['id']).subscribe((d) => {
        this.post = d;
        this.post.views = this.post.views + 7;
      });
      this.pService.updatePostById(this.post._id, this.post).subscribe();
    });
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

  submitComment() {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString(),
    });
    this.pService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = '';
      this.commentText = '';
    });
  }
}
