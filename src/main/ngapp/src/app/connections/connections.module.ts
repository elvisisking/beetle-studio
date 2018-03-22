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

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AddConnectionWizardComponent } from "@connections/add-connection-wizard/add-connection-wizard.component";
import { AddConnectionComponent } from "@connections/add-connection/add-connection.component";
import { ConnectionCardComponent } from "@connections/connections-cards/connection-card/connection-card.component";
import { ConnectionsCardsComponent } from "@connections/connections-cards/connections-cards.component";
import { ConnectionDetailsComponent } from "@connections/connections-list/connection-details.component";
import { ConnectionsListComponent } from "@connections/connections-list/connections-list.component";
import { ConnectionsRoutingModule } from "@connections/connections-routing.module";
import { ConnectionsComponent } from "@connections/connections.component";
import { ConnectionService } from "@connections/shared/connection.service";
import { CoreModule } from "@core/core.module";
import { LoggerService } from "@core/logger.service";
import { SharedModule } from "@shared/shared.module";
import { PatternFlyNgModule } from "patternfly-ng";
import { ConnectionTypeCardComponent } from "./connection-type-cards/connection-type-card/connection-type-card.component";
import { ConnectionTypeCardsComponent } from "./connection-type-cards/connection-type-cards.component";
import { AppSettingsService } from "@core/app-settings.service";
import { Http } from "@angular/http";
import { environment } from "@environments/environment";
import { MockConnectionService } from "@connections/shared/mock-connection.service";

@NgModule({
  imports: [
    ConnectionsRoutingModule,
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PatternFlyNgModule
  ],
  declarations: [
    ConnectionDetailsComponent,
    ConnectionCardComponent,
    ConnectionsCardsComponent,
    ConnectionsComponent,
    ConnectionsListComponent,
    AddConnectionWizardComponent,
    AddConnectionComponent,
    ConnectionCardComponent,
    ConnectionTypeCardsComponent,
    ConnectionTypeCardComponent
  ],
  providers: [
    {
      provide: ConnectionService,
      useFactory: connectionServiceFactory,
      deps: [ Http, AppSettingsService, LoggerService ],
      multi: false
    },
    LoggerService
  ],
  exports: [
  ]
})
export class ConnectionsModule { }

/**
 * A factory that produces the appropriate instande of the service based on current environment settings.
 *
 * @param {Http} http the HTTP service
 * @param {AppSettingsService} appSettings the app settings service
 * @param {LoggerService} logger the logger
 * @returns {ConnectionService} the requested service
 */
export function connectionServiceFactory( http: Http,
                                          appSettings: AppSettingsService,
                                          logger: LoggerService ): ConnectionService {
  return environment.production || !environment.uiDevMode ? new ConnectionService( http, appSettings, logger )
                                                          : new MockConnectionService( http, appSettings, logger );
}
