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
import { Http } from "@angular/http";
import { RouterModule } from "@angular/router";
import { AppSettingsService } from "@core/app-settings.service";
import { CoreModule } from "@core/core.module";
import { LoggerService } from "@core/logger.service";
import { AddDataserviceWizardComponent } from "@dataservices/add-dataservice-wizard/add-dataservice-wizard.component";
import { AddDataserviceComponent } from "@dataservices/add-dataservice/add-dataservice.component";
import { ConnectionNodeSelectorComponent } from "@dataservices/connection-node-selector/connection-node-selector.component";
import { ConnectionSchemaTreeComponent } from "@dataservices/connection-schema-tree/connection-schema-tree.component";
import { DataserviceCardComponent } from "@dataservices/dataservices-cards/dataservice-card/dataservice-card.component";
import { SelectionService } from "@core/selection.service";
import { DataservicesCardsComponent } from "@dataservices/dataservices-cards/dataservices-cards.component";
import { DataservicesDetailsComponent } from "@dataservices/dataservices-list/dataservices-details.component";
import { DataservicesListComponent } from "@dataservices/dataservices-list/dataservices-list.component";
import { ViewsContentComponent } from "@dataservices/dataservices-list/views-content.component";
import { DataservicesRoutingModule } from "@dataservices/dataservices-routing.module";
import { DataservicesComponent } from "@dataservices/dataservices.component";
import { SelectedNodeComponent } from "@dataservices/selected-node/selected-node.component";
import { SelectedNodesListComponent } from "@dataservices/selected-nodes-list/selected-nodes-list.component";
import { DataserviceService } from "@dataservices/shared/dataservice.service";
import { MockDataserviceService } from "@dataservices/shared/mock-dataservice.service";
import { MockVdbService } from "@dataservices/shared/mock-vdb.service";
import { NotifierService } from "@dataservices/shared/notifier.service";
import { VdbService } from "@dataservices/shared/vdb.service";
import { WizardService } from "@dataservices/shared/wizard.service";
import { SqlControlComponent } from "@dataservices/sql-control/sql-control.component";
import { TestDataserviceComponent } from "@dataservices/test-dataservice/test-dataservice.component";
import { ViewCanvasComponent } from "@dataservices/virtualization/view-editor/view-canvas/view-canvas.component";
import { ViewEditorHeaderComponent } from "@dataservices/virtualization/view-editor/view-editor-header/view-editor-header.component";
import { ViewEditorComponent } from "@dataservices/virtualization/view-editor/view-editor.component";
import { ViewPreviewComponent } from "@dataservices/virtualization/view-editor/editor-views/view-preview/view-preview.component";
import { EditorViewsComponent } from '@dataservices/virtualization/view-editor/editor-views/editor-views.component';
import { MessageLogComponent } from '@dataservices/virtualization/view-editor/editor-views/message-log/message-log.component';
import { environment } from "@environments/environment";
import { ConfirmDialogComponent } from "@shared/confirm-dialog/confirm-dialog.component";
import { SharedModule } from "@shared/shared.module";
import { TreeModule } from "angular-tree-component";
import { CodemirrorModule } from "ng2-codemirror";
import {
  ActionModule,
  CardModule,
  EmptyStateModule,
  FilterModule,
  ListModule,
  NotificationModule,
  SortModule,
  TableModule,
  ToolbarModule,
  WizardModule } from "patternfly-ng";
import { OdataControlComponent } from "./odata-control/odata-control.component";
import { AccordionModule, BsDropdownModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { ViewCardComponent } from "./virtualization/view-cards/view-card/view-card.component";
import { ViewCardsComponent } from "./virtualization/view-cards/view-cards.component";
import { VirtualizationComponent } from "./virtualization/virtualization.component";
import { ConnectionTreeSelectorComponent } from './virtualization/view-editor/connection-table-dialog/connection-tree-selector/connection-tree-selector.component';
import { ConnectionTableDialogComponent } from './virtualization/view-editor/connection-table-dialog/connection-table-dialog.component';

@NgModule({
  imports: [
    DataservicesRoutingModule,
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CodemirrorModule,
    TreeModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ActionModule,
    CardModule,
    EmptyStateModule,
    FilterModule,
    ListModule,
    NotificationModule,
    SortModule,
    TableModule,
    ToolbarModule,
    WizardModule,
    TabsModule.forRoot()
  ],
  declarations: [
    DataservicesDetailsComponent,
    ViewsContentComponent,
    DataservicesCardsComponent,
    DataservicesComponent,
    DataservicesListComponent,
    AddDataserviceWizardComponent,
    AddDataserviceComponent,
    TestDataserviceComponent,
    SqlControlComponent,
    SelectedNodeComponent,
    OdataControlComponent,
    DataserviceCardComponent,
    ConnectionSchemaTreeComponent,
    SelectedNodesListComponent,
    ConnectionNodeSelectorComponent,
    ViewEditorComponent,
    ViewPreviewComponent,
    ViewEditorHeaderComponent,
    ViewCanvasComponent,
    VirtualizationComponent,
    ViewCardsComponent,
    ViewCardComponent,
    MessageLogComponent,
    EditorViewsComponent,
    ConnectionTreeSelectorComponent,
    ConnectionTableDialogComponent
  ],
  providers: [
    {
      provide: DataserviceService,
      useFactory: dataserviceServiceFactory,
      deps: [ Http, VdbService, AppSettingsService, NotifierService, LoggerService ],
      multi: false
    },
    {
      provide: VdbService,
      useFactory: vdbServiceFactory,
      deps: [ Http, AppSettingsService, NotifierService, LoggerService ],
      multi: false
    },
    LoggerService,
    NotifierService,
    SelectionService,
    WizardService
  ],
  exports: [
  ],
  entryComponents: [ConfirmDialogComponent, ConnectionTableDialogComponent]
})
export class DataservicesModule { }

/**
 * A factory that produces the appropriate instance of the service based on current environment settings.
 *
 * @param {Http} http the HTTP service
 * @param {VdbService} vdbService the VDB service
 * @param {AppSettingsService} appSettings the app settings service
 * @param {NotifierService} notifierService the notifier service
 * @param {LoggerService} logger the logger
 * @returns {DataserviceService} the requested service
 */
export function dataserviceServiceFactory( http: Http,
                                           vdbService: VdbService,
                                           appSettings: AppSettingsService,
                                           notifierService: NotifierService,
                                           logger: LoggerService ): DataserviceService {
  return environment.production || !environment.uiDevMode ? new DataserviceService( http,
                                                                                    vdbService,
                                                                                    appSettings,
                                                                                    notifierService,
                                                                                    logger )
                                                          : new MockDataserviceService( http,
                                                                                        vdbService,
                                                                                        appSettings,
                                                                                        notifierService,
                                                                                        logger );
}

/**
 * A factory that produces the appropriate instance of the service based on current environment settings.
 *
 * @param {Http} http the HTTP service
 * @param {AppSettingsService} appSettings the app settings service
 * @param {NotifierService} notifierService the notifier service
 * @param {LoggerService} logger the logger
 * @returns {VdbService} the requested service
 */
export function vdbServiceFactory( http: Http,
                                   appSettings: AppSettingsService,
                                   notifierService: NotifierService,
                                   logger: LoggerService ): VdbService {
  return environment.production || !environment.uiDevMode ? new VdbService( http,
                                                                            appSettings,
                                                                            notifierService,
                                                                            logger )
                                                           : new MockVdbService( http,
                                                                                 appSettings,
                                                                                 notifierService,
                                                                                 logger );
}
