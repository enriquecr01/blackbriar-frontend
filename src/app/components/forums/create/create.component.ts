import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumRole, ForumMemberState, ForumResponse } from 'src/app/models/forum';

@Component({
  selector: 'create-forum',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {
  @Input() groupId: number;
  @Output() forumCreated = new EventEmitter<ForumResponse>();

  forum: FormGroup;
  roleInfo: ForumRole[];
  scoreboard: ForumMemberState[];
  date: string;
  time: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: ForumService
  ) {
    this.roleInfo = service.roleInfo;
  }

  ngOnInit(): void {
    this.forum = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      published: [true, [Validators.required]],
      warriorPoints: [20, [Validators.required, Validators.min(0), Validators.max(100)]],
      healerPoints: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
      warlockPoints: [5, [Validators.required, Validators.min(0), Validators.max(100)]],
      validResponsePoints: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngAfterViewInit(): void {
    const countedFields = document.querySelectorAll('.counted');
    const endDate = document.querySelector('.datepicker');
    const endTime = document.querySelector('.timepicker');

    M.Datepicker.init(endDate)
    M.Timepicker.init(endTime);
    M.CharacterCounter.init(countedFields);
  }

  createForum(): void {
    if (this.forum.valid && this.date && this.time) {
      this.service.createForum({
        ...this.forum.value,
        endDate: new Date(`${this.date} ${this.time}`)
      }, this.groupId).subscribe(
        (data) => {
          this.forumCreated.emit(data);

          this.scoreboard = data.scoreboard.filter(
            ({ healer, warrior, warlock }) => healer || warrior || warlock
          );

          M.toast({ html: `Your forum was successfully created!` });
          this.forum.reset();
        },
        (error) => { M.toast({ html: error.error.message }); }
      );
    } else {
      M.toast({ html: 'Form invalid, check fields.' });
    }
  }

  changeDate($event) { this.date = $event.target.value; }

  changeTime($event) { this.time = $event.target.value; }

  get published() { return this.forum.get('published').value; }
}
