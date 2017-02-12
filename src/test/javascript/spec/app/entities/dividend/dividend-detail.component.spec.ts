import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DividendDetailComponent } from '../../../../../../main/webapp/app/entities/dividend/dividend-detail.component';
import { DividendService } from '../../../../../../main/webapp/app/entities/dividend/dividend.service';
import { Dividend } from '../../../../../../main/webapp/app/entities/dividend/dividend.model';

describe('Component Tests', () => {

    describe('Dividend Management Detail Component', () => {
        let comp: DividendDetailComponent;
        let fixture: ComponentFixture<DividendDetailComponent>;
        let service: DividendService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DividendDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    DividendService
                ]
            }).overrideComponent(DividendDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DividendDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DividendService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Dividend(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dividend).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
