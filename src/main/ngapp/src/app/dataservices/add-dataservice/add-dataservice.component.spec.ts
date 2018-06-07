import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ConnectionService } from "@connections/shared/connection.service";
import { MockConnectionService } from "@connections/shared/mock-connection.service";
import { AppSettingsService } from "@core/app-settings.service";
import { CoreModule } from "@core/core.module";
import { MockAppSettingsService } from "@core/mock-app-settings.service";
import { AddDataserviceWizardComponent } from "@dataservices/add-dataservice-wizard/add-dataservice-wizard.component";
import { ConnectionNodeSelectorComponent } from "@dataservices/connection-node-selector/connection-node-selector.component";
import { ConnectionSchemaTreeComponent } from "@dataservices/connection-schema-tree/connection-schema-tree.component";
import { SelectedNodeComponent } from "@dataservices/selected-node/selected-node.component";
import { SelectedNodesListComponent } from "@dataservices/selected-nodes-list/selected-nodes-list.component";
import { DataserviceService } from "@dataservices/shared/dataservice.service";
import { MockDataserviceService } from "@dataservices/shared/mock-dataservice.service";
import { MockVdbService } from "@dataservices/shared/mock-vdb.service";
import { NotifierService } from "@dataservices/shared/notifier.service";
import { VdbService } from "@dataservices/shared/vdb.service";
import { WizardService } from "@dataservices/shared/wizard.service";
import { SharedModule } from "@shared/shared.module";
import { TreeModule } from "angular-tree-component";
import {
  ActionModule,
  CardModule,
  EmptyStateModule,
  FilterModule,
  ListModule,
  NotificationModule,
  SortModule,
  TableModule,
  WizardModule } from "patternfly-ng";
import { AddDataserviceComponent } from "./add-dataservice.component";

describe("AddDataserviceComponent", () => {
  let component: AddDataserviceComponent;
  let fixture: ComponentFixture<AddDataserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        TreeModule,
        ActionModule,
        CardModule,
        EmptyStateModule,
        FilterModule,
        ListModule,
        NotificationModule,
        SortModule,
        TableModule,
        WizardModule
      ],
      declarations: [ AddDataserviceComponent, AddDataserviceWizardComponent, ConnectionNodeSelectorComponent,
                      ConnectionSchemaTreeComponent, SelectedNodesListComponent, SelectedNodeComponent ],
      providers: [
        NotifierService, WizardService,
        { provide: AppSettingsService, useClass: MockAppSettingsService },
        { provide: DataserviceService, useClass: MockDataserviceService },
        { provide: ConnectionService, useClass: MockConnectionService },
        { provide: VdbService, useClass: MockVdbService }
      ]
    })
    .compileComponents().then(() => {
      // nothing to do
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should be created", () => {
  //   console.log("========== [AddDataserviceComponent] should be created");
  //   expect(component).toBeTruthy();
  // });
});
