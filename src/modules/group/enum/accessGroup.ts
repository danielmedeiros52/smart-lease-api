export enum UserAccessGroup {
  ADMIN_SMART = 'ADMIN_SMART', //Tem acesso total ao aplicativo e pode editar funções
  SUPPORT_SMART = 'SUPPORT_SMART', //Tem acesso total ao aplicativo e pode editar funções
  ADMIN = 'ADMIN', //Tem acesso a todos os recursos do aplicativo (função não editável)
  COMMUNITY = 'COMMUNITY', //Tem acesso a informações financeiras e todos os recursos das associações atribuídas
  LEASING_AGENT = 'LEASING_AGENT', //Tem acesso ao fluxo de trabalho de leasing e relatórios relacionados
  MAINTENANCE_MANAGER = 'MAINTENANCE_MANAGER', //Apenas tarefas
  MAINTENANCE_WORKER = 'MAINTENANCE_WORKER', //Somente minhas tarefas
  PROPERTY_MANAGER = 'PROPERTY_MANAGER', //Tem acesso a informações financeiras e todos os recursos das propriedades atribuídas
  RENTAL_OWNER = 'RENTAL_OWNER', //Tem acesso ao portal do proprietário apenas para suas propriedades
  RESIDENT_MANAGER = 'RESIDENT_MANAGER', //Informações de residentes e finanças para propriedades atribuídas
  VENDOR = 'VENDOR', //Tem acesso ao portal do fornecedor apenas para sua conta
}
