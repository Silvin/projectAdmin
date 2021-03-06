from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
admin.autodiscover()


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'projectAdmin.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$','login.views.home'),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    #url(r'^admin/', include(admin.site.urls)),
    url(r'^user/validate/','login.views.userValidate'),
    url(r'^dashboard/','principal.views.index'),


    ###############LOGIN #########################
    url(r'^login/validate/'                 ,'login.views.loginValidate'),
    url(r'^login/validateFromGoogle'        ,'login.views.validateFromGoogle'),
    url(r'^login/validateByGoogleSession'   ,'login.views.validateByGoogleSession'),
    url(r'^login/logout/'                   ,'login.views.logout'),
    
    

    ##############PROJECTS#########################


    url(r'^projects/list'       ,'principal.project.projectList'),
    url(r'^projects/new'        ,'principal.project.projectAdd'),
    url(r'^projects/edit'       ,'principal.project.projectEdit'),
    url(r'^projects/delete'     ,'principal.project.projectDelete'),
    url(r'^projects/save'       ,'principal.project.projectSave'),


    ##############TASKS#########################
    
    url(r'^tasks/list'          ,'principal.task.taskList'),
    url(r'^tasks/getByTarget'   ,'principal.task.getTaskByTarget'),
    url(r'^tasks/delete'        ,'principal.task.removeTask'),
    url(r'^tasks/new'           ,'principal.task.taskAdd'),
    url(r'^tasks/show'          ,'principal.task.showDetail'),
    url(r'^tasks/admin'         ,'principal.task.taskAdmin'),
    url(r'^tasks/savetimeline'  ,'principal.task.saveTimeLine'),
    url(r'^tasks/save'          ,'principal.task.taskSave'),
    url(r'^tasks/mytasks'       ,'principal.task.myTasks'),
    url(r'^tasks/filter'        ,'principal.task.Tasksfilter'),
    url(r'^tasks/dashboard'     ,'principal.task.dashboard'),
    url(r'^tasks/report'        ,'principal.task.generateWeeklyReport'),
    
    
    
    

    #######################DOCUMENTS, WITH GOOGLE SOURE#########################

    url(r'^document/show'          ,'principal.document.showDocuments'),
    url(r'^document/getList'       ,'principal.document.getList'),
    url(r'^document/newFolder'     ,'principal.document.newFolder'),
    url(r'^document/upload'        ,'principal.document.upload'),
    url(r'^document/share'          ,'principal.document.shareItem'),
    url(r'^document/getToken'      ,'principal.document.getProjectAccountToken'),
    
    


    ########################### TIPS #############################################
    url(r'^tips/add'                ,'principal.knowledgeTips.add'),
    url(r'^tips/list'               ,'principal.knowledgeTips.listTips'),
    url(r'^tips/home'               ,'principal.knowledgeTips.home'),
    url(r'^tips/search'             ,'principal.knowledgeTips.filterTips'),
    
    

    


    ##############TARGETS #########################

    url(r'^target/list'             ,'principal.target.targetList'),
    url(r'^target/remove'           ,'principal.target.targetRemove'),
    url(r'^target/finish'           ,'principal.target.targetFinish'),
    url(r'^target/getbyproject'     ,'principal.target.getTargetByProjectId'),
    url(r'^target/get'              ,'principal.target.targetGetData'),
    url(r'^target/save'             ,'principal.target.targetSave'),
    url(r'^target/detail'           ,'principal.target.targetDetail'),
    url(r'^target/prueba'           ,'principal.target.targetPrueba'),
    



     ##############COMMENTS#########################

    url(r'^comment/addfortask'      ,'principal.comment.addForTask'),
    url(r'^comment/list'            ,'principal.comment.listByTaskId'),
    url(r'^team/resumeonelist'      ,'principal.team.resumeOneList'),
    url(r'^team/resumetwolist'      ,'principal.team.resumeTwoList'),
    url(r'^team/resumethreelist'    ,'principal.team.resumeThreeList'),
    url(r'^team/resumeone'          ,'principal.team.resumeOne'),
    url(r'^team/resumetwo'          ,'principal.team.resumeTwo'),
    url(r'^team/resumethree'        ,'principal.team.resumeThree'),
    url(r'^team/listowner'          ,'principal.team.ListOwner'),
    url(r'^team/list'               ,'principal.team.List'),
    url(r'^team/resume'             ,'principal.team.getResume'),
    url(r'^documents/list'          ,'principal.views.documentList'),





    ####################CLIENT ###########################
    url(r'^client/save-ajax'        ,'principal.client.saveNewByAjax'),
    
    
    
    ####################GOOGLE AUTH ###########################
    url(r'^auth/code'               ,'principal.auth.home'),
    url(r'^auth/savecode'           ,'principal.auth.saveCode'),
    
    
    
    
    
    ####################USER, PROFILES, MENUS  ADMIN  ###########################
    
    ######USER
    url(r'^admin/area/list'          ,'principal.admin.getListArea'),
    url(r'^admin/profile/list'       ,'principal.admin.getListProfile'),
    url(r'^admin/user/list'          ,'principal.admin.getList'),
    url(r'^admin/user/remove'        ,'principal.admin.removeUser'),
    url(r'^admin/user/update'        ,'principal.admin.updateUser'),
    url(r'^admin/user/save'          ,'principal.admin.userSave'), 
    url(r'^admin/user'               ,'principal.admin.userList'),
    
    
    
    
    #####PROFILE
    url(r'^admin/profile/new'       ,'principal.admin.profileNew'),
    url(r'^admin/profile/save'      ,'principal.admin.profileSave'),
    url(r'^admin/profile'           ,'principal.admin.profileList'),
    
    
    
    
    #####MENU
    url(r'^admin/menu/new'          ,'principal.admin.menuNew'),
    url(r'^admin/menu'              ,'principal.admin.menuList'),
    
    ######CATALOGS
    
    url(r'^catalogs/list'           ,'principal.catalog.catalogList'),
    url(r'^catalogs/new'            ,'principal.catalog.catalogNew'),
    url(r'^catalogs/save'           ,'principal.catalog.catalogSave'),
    url(r'^catalogs/remove'         ,'principal.catalog.catalogRemove'),
    
    
    
    ############## CALENDAR   #########################

    url(r'^calendar/list'           ,'principal.calendar.List'),
    url(r'^calendar/save'           ,'principal.calendar.Save'),
    url(r'^calendar/getAll'         ,'principal.calendar.getAll'),
    url(r'^calendar/getTotalHours'  ,'principal.calendar.getSpendingHours'),
    
    
    
    


) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
