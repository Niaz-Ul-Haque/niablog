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

  constructor(private route: ActivatedRoute, private data: PostService) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.data.getPostById(params['id']).subscribe((dataa) => {
        this.post = dataa;
      });
    });
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }
}
