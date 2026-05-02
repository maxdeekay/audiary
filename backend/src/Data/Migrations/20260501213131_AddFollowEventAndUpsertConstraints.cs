using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddFollowEventAndUpsertConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ActivityEvents_CollectionAlbumId",
                table: "ActivityEvents");

            migrationBuilder.DropIndex(
                name: "IX_ActivityEvents_UserId",
                table: "ActivityEvents");

            migrationBuilder.AlterColumn<int>(
                name: "CollectionAlbumId",
                table: "ActivityEvents",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "TargetUserId",
                table: "ActivityEvents",
                type: "integer",
                nullable: true);

            migrationBuilder.Sql(@"
                DELETE FROM ""ActivityEvents""
                WHERE ""Id"" IN (
                    SELECT ""Id"" FROM (
                        SELECT ""Id"",
                               ROW_NUMBER() OVER (
                                   PARTITION BY ""CollectionAlbumId"", ""Type""
                                   ORDER BY ""CreatedAt"" DESC, ""Id"" DESC
                               ) AS rn
                        FROM ""ActivityEvents""
                        WHERE ""CollectionAlbumId"" IS NOT NULL
                    ) t
                    WHERE rn > 1
                );
            ");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityEvents_CollectionAlbumId_Type",
                table: "ActivityEvents",
                columns: new[] { "CollectionAlbumId", "Type" },
                unique: true,
                filter: "\"CollectionAlbumId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityEvents_TargetUserId",
                table: "ActivityEvents",
                column: "TargetUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityEvents_UserId_TargetUserId_Type",
                table: "ActivityEvents",
                columns: new[] { "UserId", "TargetUserId", "Type" },
                unique: true,
                filter: "\"TargetUserId\" IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityEvents_Users_TargetUserId",
                table: "ActivityEvents",
                column: "TargetUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityEvents_Users_TargetUserId",
                table: "ActivityEvents");

            migrationBuilder.DropIndex(
                name: "IX_ActivityEvents_CollectionAlbumId_Type",
                table: "ActivityEvents");

            migrationBuilder.DropIndex(
                name: "IX_ActivityEvents_TargetUserId",
                table: "ActivityEvents");

            migrationBuilder.DropIndex(
                name: "IX_ActivityEvents_UserId_TargetUserId_Type",
                table: "ActivityEvents");

            migrationBuilder.DropColumn(
                name: "TargetUserId",
                table: "ActivityEvents");

            migrationBuilder.AlterColumn<int>(
                name: "CollectionAlbumId",
                table: "ActivityEvents",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActivityEvents_CollectionAlbumId",
                table: "ActivityEvents",
                column: "CollectionAlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityEvents_UserId",
                table: "ActivityEvents",
                column: "UserId");
        }
    }
}
