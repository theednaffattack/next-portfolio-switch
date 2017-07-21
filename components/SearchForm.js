

  // static propTypes = {
  //   /**
  //    * demo string from redux actions.
  //    */
  //   state: PropTypes.object.isRequired,
  //   *
  //    * redux function from actions to set the string, accepts a string param,
  //    * if none is passed, it will return the default string set in the action.
     
  //   getWiki: PropTypes.func.isRequired,
  // };
  constructor() {
    super();
    this.wikiSearch = this.wikiSearch.bind(this);
    this.state = {
      searchBox: ''
    };
  }
  componentDidMount() {
    const { getWiki } = this.props;
    // getWiki();
  }

  handleInputChange(event) {
          this.setState({
              searchBox: event.target.value
          });
      }

  handleSubmit(event) {
      event.preventDefault();
      let searchBox = this.state.searchBox.trim(); // Remove whitespace at the beginning and end.

      if (!searchBox) { // If no search term was typed, return early and do nothing.
          return;
      }

      this.props.onSearch(searchBox); // Execute callback
      this.setState({ searchBox: '' });
  }

  /**
   * Change the demo string to whatever you pass as a parameter.
   * @param {string} theString - String to be passed to show in component.
   */
  wikiSearch(type) {
    // setString(theString);
    const { getWiki } = this.props;
    console.log(type)
    getWiki(type);
  }

    // const exampleString = this.props.state.wiki ? this.props.state.example.wiki : '';
    const { wiki, getWiki } = this.props;

    const pages = !this.props.wiki.fetchedData ? '' :
                  !this.props.wiki.fetchedData ? '' :
                  !this.props.wiki.fetchedData.query ? 'test' :
                  !this.props.wiki.fetchedData.query.pages ? 'test' :
                  this.props.wiki.fetchedData.query.pages
    const apiData = !pages ? '' :
                    pages[Object.keys(pages)];
    const apiValue =  !apiData ? '' :
                      Object.values(apiData);

          <form onSubmit={this.handleSubmit.bind(this)}>
            <Button
              bg='fuschia5'
              p={1}
              id='search'
              onClick={() => this.wikiSearch('search')}
              value={this.state.searchBox}
            >
              Search Wikipedia
            </Button>
            <br/>
            <Button
              bg='pink4'
              p={1}
              is='a'
              target='_blank'
              onClick={() => this.wikiSearch('random')}
            >
              Get a Random Wikipedia Page
            </Button>
            <p>
             
            </p>
            <input type='text' name='searchBox' id='searchBox' onChange={this.handleInputChange.bind(this)} value={this.state.searchBox} />
          </form>
          <h2>Let's map some stuff</h2>
            <MaxWidthPanel>
              <Row>
                <Col xs={12} md={12}>
                  <Pre>{ JSON.stringify(apiData, null, 2) || "It's blank" }</Pre>
                  <Text><a href="http://en.wikipedia.org/wiki/FooBar?curid={!apiData ? '' : apiData.pageid}">Blaaaah</a></Text>
                  <Text>{!apiData ? '' : apiData.ns}</Text>
                  <Text>{!apiData ? '' : apiData.title}</Text>
                  <Text>{!apiData ? '' : apiData.extract}</Text>
                  <img src={
                    !apiData ? '' :
                    !apiData.thumbnail ? '' :
                    apiData.thumbnail.source
                  }/>
                </Col>
              </Row>
            </MaxWidthPanel>