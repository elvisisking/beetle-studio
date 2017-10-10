/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Activity } from "@activities/shared/activity.model";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Input } from "@angular/core";
import { Output } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "app-activities-cards",
  templateUrl: "activities-cards.component.html",
  styleUrls: ["activities-cards.component.css"]
})
export class ActivitiesCardsComponent {

  @Input() private activities: Activity[];
  @Input() private selectedActivities: Activity[];
  @Output() private activitySelected: EventEmitter<Activity> = new EventEmitter<Activity>();
  @Output() private activityDeselected: EventEmitter<Activity> = new EventEmitter<Activity>();
  @Output() private tagSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() private startActivity: EventEmitter<string> = new EventEmitter<string>();
  @Output() private editActivity: EventEmitter<string> = new EventEmitter<string>();
  @Output() private deleteActivity: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Constructor.
   */
  constructor() {
    // nothing to do
  }

  public toggleActivitySelected(activity: Activity): void {
    if (this.isSelected(activity)) {
      this.activityDeselected.emit(activity);
    } else {
      this.activitySelected.emit(activity);
    }
  }

  public isSelected(activity: Activity): boolean {
    return this.selectedActivities.indexOf(activity) !== -1;
  }

  public onStartActivity(activityName: string): void {
    this.startActivity.emit(activityName);
  }

  public onEditActivity( activityName: string): void {
    this.editActivity.emit(activityName);
  }

  public onDeleteActivity(activityName: string): void {
    this.deleteActivity.emit(activityName);
  }

  public selectTag(tag: string, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.tagSelected.emit(tag);
  }

}
