let fakeData = {
  _id: { $oid: 'someRandomNumberMongoDBAssings' },
  googleId: 103970352561814947806,
  userName: 'JOhn Hong',
  binder_arr_obj: [
    {
      _id: { $oid: 'someRandomNumberMongoDBAssings' },
      binder_count: 1,
      binder_name: 'Binder1',
      binder_color: 'red',
      tab_arr_obj: [
        {
          _id: { $oid: 'someRandomNumberMongoDBAssings' },
          tab_count: 1,
          tab_color: 'blue',
          tab_name: 'Tab1',
          page_arr_obj: [
            {
              page_arr_obj: [
                {
                  _id: { $oid: 'someRandomNumberMongoDBAssings' },
                    videoTitle: "king of the hills",
                    videoId: "Ukg_U3CnJWI",
                    videoURL: "adfadsfa.com"
                }
              ],
              panel_dimensions: {
                lecture_Panel: {
                  top_left_panel_height: 1,
                  top_left_panel_width: 1,
                  top_right_panel_height: 1,
                  number_of_panels: 1
                },
                video_Panel: {
                  width: '1',
                  height: '1'
                },
                note_Panel: {
                  width: '1',
                  height: '1'
                },
                meister_Panel: {
                  width: '1',
                  height: '1'
                }
              }
            }
          ]
        }
      ]
    }
  ]
}

module.exports = JSON.stringify(fakeData);