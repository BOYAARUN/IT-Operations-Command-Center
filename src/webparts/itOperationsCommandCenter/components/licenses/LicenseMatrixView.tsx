import * as React from "react";
import styles from "./LicenseMatrixView.module.scss";
import {
  LicenseAllocationService,
  ILicenseAllocation
} from "../../services/LicenseAllocationService";

interface IProps {
  serviceContext: any;
  onClientSelect?: (client: string) => void;
}

interface IState {
  loading: boolean;
  allocations: ILicenseAllocation[];
  clients: string[];
  licenses: string[];
  error?: string;
}


export default class LicenseMatrixView extends React.Component<
  IProps,
  IState
> {

  private service: LicenseAllocationService;


  constructor(props: IProps) {
    super(props);

    this.service = new LicenseAllocationService(
      props.serviceContext
    );

    this.state = {
      loading: true,
      allocations: [],
      clients: [],
      licenses: []
    };
  }


  public async componentDidMount() {

    await this.loadData();

  }



  private async loadData() {

    try {

      const data =
        await this.service.getAllocations();


      const clients =
        Array.from(
          new Set(
            data
              .map(x => x.Client)
              .filter(Boolean)
          )
        ) as string[];



      const licenses =
        Array.from(
          new Set(
            data.map(
              x =>
                x.License?.Title
            )
            .filter(Boolean)
          )
        ) as string[];



      this.setState({

        allocations:data,

        clients,

        licenses,

        loading:false

      });


    }
    catch(error){

      this.setState({

        loading:false,

        error:
          "Unable to load license allocations"

      });

    }

  }



  private getCount(
    client:string,
    license:string
  ){

    return this.state.allocations.filter(

      x =>
        x.Client === client &&
        x.License?.Title === license &&
        x.Status !== "Removed"

    ).length;

  }



  private openClient(client:string){

    if(this.props.onClientSelect){

      this.props.onClientSelect(client);

    }

  }



  public render(){

    const {
      loading,
      clients,
      licenses,
      error
    } = this.state;



    if(loading){

      return (

        <div className={styles.loading}>
          Loading licenses...
        </div>

      );

    }



    if(error){

      return (

        <div className={styles.error}>
          {error}
        </div>

      );

    }



    return (

      <div className={styles.page}>


        <div className={styles.header}>

          <div>

            <h2>
              License Allocation Matrix
            </h2>

            <span>
              Client wise license utilization
            </span>

          </div>


        </div>



        <div className={styles.tableContainer}>


          <table>


            <thead>


              <tr>


                <th>
                  Client
                </th>


                {
                  licenses.map(

                    license => (

                      <th key={license}>
                        {license}
                      </th>

                    )

                  )
                }


              </tr>


            </thead>



            <tbody>


            {
              clients.map(

                client => (

                  <tr
                    key={client}
                    onClick={() =>
                      this.openClient(client)
                    }
                  >


                    <td className={styles.clientName}>

                      {client}

                    </td>


                    {
                      licenses.map(

                        license => (

                          <td key={license}>

                            <span
                              className={
                                styles.count
                              }
                            >

                              {
                                this.getCount(
                                  client,
                                  license
                                )
                              }

                            </span>

                          </td>

                        )

                      )
                    }


                  </tr>

                )

              )
            }


            </tbody>


          </table>


        </div>



        {
          clients.length === 0 &&

          <div className={styles.empty}>

            No license allocations found

          </div>

        }


      </div>

    );

  }


}