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

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Connection } from "@connections/shared/connection.model";

@Component({
  moduleId: module.id,
  selector: "app-connections-list",
  templateUrl: "connections-list.component.html",
  styleUrls: ["connections-list.component.css"]
})
export class ConnectionsListComponent {

  private router: Router;

  @Input() private connections: Connection[];
  @Input() private selectedConnections: Connection[];
  @Output() private connectionSelected: EventEmitter<Connection> = new EventEmitter<Connection>();
  @Output() private connectionDeselected: EventEmitter<Connection> = new EventEmitter<Connection>();
  @Output() private tagSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() private pingConnection: EventEmitter<string> = new EventEmitter<string>();
  @Output() private deleteConnection: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Constructor.
   */
  constructor(router: Router) {
    this.router = router;
  }

  public toggleConnectionSelected(connection: Connection): void {
    if (this.isSelected(connection)) {
      this.connectionDeselected.emit(connection);
    } else {
      this.connectionSelected.emit(connection);
    }
  }

  public isSelected(connection: Connection): boolean {
    return this.selectedConnections.indexOf(connection) !== -1;
  }

  public onPingConnection(connectionName: string): void {
    this.pingConnection.emit(connectionName);
  }

  public onDeleteConnection(connectionName: string): void {
    this.deleteConnection.emit(connectionName);
  }

  public onSelectTag(tag: string, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.tagSelected.emit(tag);
  }

}
