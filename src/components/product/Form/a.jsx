{
  /* <Form.Item
          style={{ marginBottom: "15px" }}
          name="productSubCategoryId"
          className="w-full sm:w-1/3"
          label={
            <>
              Sub Category
              <BigDrawer title={"Sub Category"}>
                <AddProductCategory drawer={true} />
              </BigDrawer>
            </>
          }
        >
          <Select
            name="productSubCategoryId"
            loading={!subCategory}
            showSearch
            placeholder="Select Subcategory"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={prodSubCatHandler}
          >
            {subCategory &&
              subCategory.map((subcat) => (
                <Select.Option key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "15px" }}
          name="productSubSubCategoryId"
          className="w-full sm:w-1/3"
          label={
            <>
              Sub Sub Category
              <BigDrawer title={"Sub Sub Category"}>
                <AddProductCategory drawer={true} />
              </BigDrawer>
            </>
          }
        >
          <Select
            name="productSubSubCategoryId"
            loading={!subSubCategory}
            showSearch
            placeholder="Select Sub-Subcategory"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={prodSubSubCatHandler}
          >
            {subSubCategory &&
              subSubCategory.map((subsubcat) => (
                <Select.Option key={subsubcat.id} value={subsubcat.id}>
                  {subsubcat.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item> */
}
