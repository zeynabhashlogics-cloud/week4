
export type statustype = "completed" | "pending" ;
export type prioritytype="low"|"high"|"medium";

export type Task =
{

      id :number;
      status:statustype;
      priority:prioritytype;
      title:string;
    
};